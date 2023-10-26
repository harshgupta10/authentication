const jsonfile = require('jsonfile')
const moment = require('moment')
const FILE_PATH = './data.json'
const simpleGit = require('simple-git')
// const random = require('random')

// const makeCommit = n=>{
//     if(n==0) return simpleGit().push()
//     const x = Math.floor(Math.random(0,54)*54)
//     const y = Math.floor(Math.random(0,6)*6)
//     const DATE = moment().subtract(1,'y').add(1,'d').add(x,'w').add(y,'d').format()

// const data = {
//     date:DATE
// }
// console.log(DATE)
// jsonfile.writeFile(FILE_PATH, data,()=>{
//     simpleGit().add([FILE_PATH]).commit(DATE,{'--date':  DATE}, makeCommit.bind(this, --n))
// })
// }


// makeCommit(100)



const makeCommitBetweenMonths = (startMonth, endMonth, n) => {
    if (n === 0) return simpleGit().push();

    // Calculate a random day between startMonth and endMonth in the current year
    const start = moment().month(startMonth).date(1);
    const end = moment().month(endMonth).endOf('month');
    const randomDate = moment(start).add(Math.random() * (end.diff(start)), 'milliseconds');

    const DATE = randomDate.format();

    const data = {
        date: DATE
    };

    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE }, makeCommitBetweenMonths.bind(this, startMonth, endMonth, --n));
    });
};


const startMonth = 7;  
const endMonth = 9;    

makeCommitBetweenMonths(startMonth, endMonth, 60);