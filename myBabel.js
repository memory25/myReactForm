module.exports = function({types: t}) {

function JSXElementVisitor(path, state) {
  const tagName = path.node.openingElement.name.name;
  updateAttributes(t, path, tagName, state);
}

function BlockStatementVisitor(path) {
  const onChange = initAttr('onChange');
  const iptObj = initAttr('iptObj');
  const iptValid = initAttr('iptValid');
  const selectObj = initAttr('selectObj');
  const checkboxObj = initAttr('checkboxObj');
  path.node.body.forEach((node) => {
    if (node.leadingComments && onChange.value === '') {
      node.leadingComments.forEach((comment) => {
        const value = comment.value.split('=')
        checkSource(value, '@onChange', onChange);
        checkSource(value, '@ipt', iptObj);
        checkSource(value, '@iptValid', iptValid);
        checkSource(value, '@select', selectObj);
        checkSource(value, '@checkbox', checkboxObj);
      })
    }
  })
  generateVarDeclaration(t, path, onChange);
  generateVarDeclaration(t, path, iptObj);
  generateVarDeclaration(t, path, iptValid);
  generateVarDeclaration(t, path, selectObj);
  generateVarDeclaration(t, path, checkboxObj);
  path.traverse({JSXElement: JSXElementVisitor}, {
    onChange,
    iptObj,
    iptValid,
    selectObj,
  checkboxObj})
}


return {
  visitor: {
    BlockStatement: BlockStatementVisitor,
  }
}
}


function checkSource(value, keyword, attrObj) {
  if (value[0].trim() === keyword) {
    attrObj.value = value[1].trim();
    attrObj.var = `${attrObj.name}_SamRandom` + Math.floor(Math.random() * 100000)
  }
}

function generateVarDeclaration(t, path, attrObj) {
  if (attrObj.value === '') return;
  const variable = t.VariableDeclaration(
    'const',
    [t.VariableDeclarator(
      t.Identifier(
        attrObj.var
      ),
      t.Identifier(attrObj.value)
    )]
  )

  path.node.body = [variable, ...path.node.body]
}

function initAttr(name) {
  return {
    var: '',
    value: '',
    name: name
  }
}


function updateAttributes(t, path, tagName, state) {
  if (tagName !== 'InputTemplate' && tagName !== 'PasswordTemplate' && tagName !== 'TextareaTemplate' && tagName !== 'SelectTemplate' && tagName !== 'CheckboxTemplate') return;

  const attrList = path.node.openingElement.attributes;
  const attrResult = {
    onChange: true,
  };

  if (tagName === 'InputTemplate' || tagName === 'PasswordTemplate' || tagName === 'TextareaTemplate') {
    attrResult.iptObj = true;
    attrResult.iptValid = true;
  } else if (tagName === 'SelectTemplate') {
    attrResult.selectObj = true;
  } else if (tagName === 'CheckboxTemplate') {
    attrResult.checkboxObj = true;
  }


  attrList.forEach((node) => {
    // filter if attr exist
    delete attrResult[node.name.name];
  })

  Object.keys(attrResult).forEach((attrName) => {
    let defaultAttrName = attrName
    if (attrName === 'iptObj' || attrName === 'selectObj' || attrName === 'checkboxObj') {
      defaultAttrName = attrName.slice(0, -3)
    }
    path.node.openingElement.attributes.push(
      t.JSXAttribute(
        t.JSXIdentifier(attrName),
        t.JSXExpressionContainer(
          state[attrName].var === '' ? t.Identifier(`props.${defaultAttrName}`) : t.Identifier(state[attrName].var)
        )
      )
    )

  })
}