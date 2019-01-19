const init = {
  errStatus: 200,
  errMessage: '',
  isError: false,
};

const nonHttpError = {
  errStatus: 1,
  errMessage: 'Unpredictable Error',
  isError: true,
};

const check = resArr =>
  resArr.forEach(res => {
  	if(res instanceof Array){
  		check(res)
  	}
    if (res.isError) throw res;
  });

const transform = error => (error.isError ? error : nonHttpError);

export default {init, check, transform};
