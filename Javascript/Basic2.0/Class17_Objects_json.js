const blenderUser = {}

blenderUser.id = "123abc"
blenderUser.name = "Shreyansh"

console.log(blenderUser);

console.log("-----");
const regularUser = {
    email: "ok@gmail.com",
    fullname: {
        userFullName: {
            firstName: "Shreyansh",
            lastNmae: "Gajjar"
        }
    },
}


console.log(regularUser.fullname?.userFullName.firstName);

const object1 = {1: "a", 2: "b"}
const object2 = {3: "a", 4: "b"}


const obj3 = Object.assign({}, object1, object2)
console.log(obj3);

const obj4 = {...object1, ...object2}
console.log(obj4);

const user=[
    {
        id: 1,
        email: "ok@gmail.com"
    },
    {
        id: 2,
        email: "ok@gmail.com"
    },
    {
        id: 3,
        email: "ok@gmail.com"
    },
    {
        id: 4,
        email: "ok@gmail.com"
    },
]

console.log(user[1].email);

console.log("---------");

console.log(blenderUser);
console.log(Object.keys(blenderUser));
console.log(Object.values(blenderUser));
console.log(Object.entries(blenderUser));
console.log(blenderUser.hasOwnProperty('id'));

console.log("---------------++++++-----------------");

const course = {
    coursename: "js in hindi",
    price: "999",
    courseInstructor: "Shreyansh"
}

//console.log(course.courseInstructor);

const {courseInstructor : instructor} = course
console.log(instructor);

        /*
            const navbar = ({company}) =>{

            }

            navbar(company = Google)
        */

        //json
        /*
            {
                "coursename": "js in hindi",
                "price": "999",
                "courseInstructor": "Shreyansh"
            }
        */
