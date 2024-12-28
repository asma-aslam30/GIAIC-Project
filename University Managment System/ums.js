var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Person class jo naam aur umar ko store karti hai.
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
// Student class jo Person se inherit hoti hai aur extra properties jese id aur courses list rakhti hai.
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, id) {
        var _this = _super.call(this, name, age) || this;
        _this.id = id;
        _this.courses = [];
        return _this;
    }
    // Student ko course mein register karta hai aur course ke students list mein add karta hai.
    Student.prototype.registerForCourse = function (course) {
        this.courses.push(course);
        course.addStudent(this);
    };
    // Student ko course se drop karta hai aur course ke students list se remove karta hai.
    Student.prototype.dropCourse = function (course) {
        this.courses = this.courses.filter(function (c) { return c.id !== course.id; });
        course.removeStudent(this);
    };
    return Student;
}(Person));
// Instructor class jo Person se inherit hoti hai aur extra properties jese salary aur courses list rakhti hai.
var Instructor = /** @class */ (function (_super) {
    __extends(Instructor, _super);
    function Instructor(name, age, salary) {
        var _this = _super.call(this, name, age) || this;
        _this.salary = salary;
        _this.courses = [];
        return _this;
    }
    // Instructor ko course assign karta hai aur course ke instructor ko set karta hai.
    Instructor.prototype.assignCourse = function (course) {
        this.courses.push(course);
        course.setInstructor(this);
    };
    return Instructor;
}(Person));
// Course class jo course ka id, naam, students list aur instructor rakhti hai.
var Course = /** @class */ (function () {
    function Course(id, name) {
        this.id = id;
        this.name = name;
        this.students = [];
        this.instructor = null;
    }
    // Course mein student ko add karta hai.
    Course.prototype.addStudent = function (student) {
        this.students.push(student);
    };
    // Course se student ko remove karta hai.
    Course.prototype.removeStudent = function (student) {
        this.students = this.students.filter(function (s) { return s.id !== student.id; });
    };
    // Course ke liye instructor ko set karta hai.
    Course.prototype.setInstructor = function (instructor) {
        this.instructor = instructor;
    };
    return Course;
}());
// Department class jo department ka naam aur courses list rakhti hai.
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
        this.courses = [];
    }
    // Department mein course ko add karta hai.
    Department.prototype.addCourse = function (course) {
        this.courses.push(course);
    };
    // Department se course ko remove karta hai.
    Department.prototype.removeCourse = function (course) {
        this.courses = this.courses.filter(function (c) { return c.id !== course.id; });
    };
    return Department;
}());
// Example ke tor pe, kuch students, instructors aur courses create kiye gaye hain.
var student1 = new Student('Alice', 20, 12345);
var student2 = new Student('Bob', 21, 12346);
var instructor1 = new Instructor('Eve', 30, 40000);
var instructor2 = new Instructor('Charlie', 35, 45000);
var course1 = new Course(1, 'Introduction to Computer Science');
var course2 = new Course(2, 'Advanced Programming');
var department1 = new Department('Computer Science');
// Courses ko department mein add kiya gaya hai.
department1.addCourse(course1);
department1.addCourse(course2);
// Students ko courses mein register kiya gaya hai.
student1.registerForCourse(course1);
student2.registerForCourse(course1);
// Instructors ko courses assign kiya gaya hai.
instructor1.assignCourse(course1);
console.log(student1.getName()); // Output: Alice
console.log(student1.courses); // Output: [Course]
console.log(instructor1.courses); // Output: [Course]
console.log(department1.courses); // Output: [Course, Course]
// Additional operations
student1.dropCourse(course1); // Student ko course se drop karta hai.
console.log(student1.courses); // Output: []
department1.removeCourse(course2); // Course ko department se remove karta hai.
console.log(department1.courses); // Output: [Course]
