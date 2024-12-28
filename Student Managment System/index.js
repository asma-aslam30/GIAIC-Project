import * as readline from 'readline';
class CollegeImpl {
    id;
    name;
    streams;
    capacity;
    students;
    constructor(id, name, capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.students = [];
        this.streams = [];
    }
    addStream(stream) {
        this.streams.push(stream);
    }
    addStudent(student) {
        this.students.push(student);
    }
    apply(student, stream) {
        if (student.marks >= stream.admissionCriteria) {
            console.log(`${student.name} has applied successfully for ${stream.name}.`);
            student.appliedStreams.push(stream);
        }
        else {
            console.log(`${student.name} is not eligible to apply for ${stream.name}.`);
        }
    }
    takeAdmission(student, stream) {
        if (stream.seats > 0) {
            stream.reduceSeats(1);
            this.addStudent(student);
            console.log(`${student.name} is admitted to ${stream.name}.`);
        }
        else {
            console.log(`No seats available in ${stream.name} for ${student.name}.`);
        }
    }
}
class UniversityImpl {
    id;
    name;
    type;
    colleges;
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.colleges = [];
    }
    register(college) {
        this.colleges.push(college);
    }
    remove(college) {
        this.colleges = this.colleges.filter(col => col.id !== college.id);
    }
}
class SearchByName {
    item;
    constructor(item) {
        this.item = item;
    }
    isSatisfied(college) {
        return college.name === this.item;
    }
}
class SearchByStream {
    item;
    constructor(item) {
        this.item = item;
    }
    isSatisfied(college) {
        return college.streams.some(stream => stream.name === this.item);
    }
}
class BetterSearch {
    search(colleges, spec) {
        return colleges.filter(college => spec.isSatisfied(college));
    }
}
const university = new UniversityImpl("1", "Tech University", "Public");
const college = new CollegeImpl("1", "Engineering College", 300);
const stream = {
    id: "1",
    name: "Computer Science",
    admissionCriteria: 90,
    seats: 50,
    subjects: ["CS101", "CS102"],
    reduceSeats(count) {
        this.seats -= count;
    }
};
college.addStream(stream);
university.register(college);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const promptUser = async (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};
const main = async () => {
    try {
        const id = await promptUser('Enter student ID: ');
        const name = await promptUser('Enter student name: ');
        const marks = await promptUser('Enter student marks: ');
        const student = {
            id,
            name,
            marks: parseInt(marks),
            appliedStreams: []
        };
        const streamName = await promptUser('Enter stream name to apply for: ');
        const selectedStream = college.streams.find(s => s.name === streamName);
        if (selectedStream) {
            college.apply(student, selectedStream);
            const answer = await promptUser('Do you want to take admission? (yes/no): ');
            if (answer.toLowerCase() === 'yes') {
                college.takeAdmission(student, selectedStream);
            }
            const search = new BetterSearch();
            const results = search.search(university.colleges, new SearchByName("Engineering College"));
            console.log(results);
        }
        else {
            console.log(`Stream ${streamName} not found.`);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        rl.close();
    }
};
main();
