
exports.proCode=(pcode)=>{



let num=Number(pcode.substr(2,6));
// console.log(num,typeof num)
num++;
return "MM"+num;


}