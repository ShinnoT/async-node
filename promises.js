const users = [
  {
    id: 1,
    name: "shinno",
    schoolId: 101
  },
  {
    id: 2,
    name: "john",
    schoolId: 999
  }
];

const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 999,
    grade: 90
  },
  {
    id: 3,
    schoolId: 101,
    grade: 80
  }
];

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    const userGrades = grades.filter(grade => grade.schoolId === schoolId);
    if (userGrades.length === 0) {
      reject(`unable to find grades for ${schoolId}`);
    } else if (userGrades) {
      resolve(userGrades);
    }
  });
};

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(`unable to find user with ${id}`);
    }
  });
};

// const getStatus = userId => {
//   let user;
//   return getUser(userId)
//     .then(tempUser => {
//       user = tempUser;
//       return getGrades(user.schoolId);
//     })
//     .then(grades => {
//       let sum = 0;
//       grades.forEach(grade => {
//         sum += grade.grade;
//       });
//       console.log(`grade average for ${user.name}: `, sum / grades.length);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

// getStatus(1);

//new async syntax
//async functions ALWAYS ALWAYS RETURN PROMISES
const getStatusAlt = async userId => {
  // throw new Error("this is an error");
  // return "mike";
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let sum = 0;
  grades.forEach(grade => {
    sum += grade.grade;
  });
  return sum / grades.length;
};
// returns Promise {'mike'}

getStatusAlt(1)
  .then(user => {
    console.log(user);
  })
  .catch(error => {
    console.log(error);
  });

// getUser(2)
//   .then(user => {
//     console.log(user);
//     console.log("---------------------");
//   })
//   .catch(error => {
//     console.log(error);
//   });

// getGrades(101)
//   .then(grades => {
//     grades.forEach(grade => {
//       console.log(grade);
//       console.log("---------------------");
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });
