import * as readline from 'readline';

interface Stream {
    id: string;
    name: string;
    admissionCriteria: number;
    seats: number;
    subjects: string[];
    reduceSeats: (count: number) => void;
}

interface Student {
    id: string;
    name: string;
    marks: number;
    appliedStreams: Stream[];
}

interface College {
    id: string;
    name: string;
    streams: Stream[];
    capacity: number;
    students: Student[];
    addStream: (stream: Stream) => void;
    addStudent: (student: Student) => void;
    apply: (student: Student, stream: Stream) => void;
    takeAdmission: (student: Student, stream: Stream) => void;
}

class CollegeImpl implements College {
    id: string;
    name: string;
    streams: Stream[];
    capacity: number;
    students: Student[];

    constructor(id: string, name: string, capacity: number) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.students = [];
        this.streams = [];
    }

    addStream(stream: Stream) {
        this.streams.push(stream);
    }

    addStudent(student: Student) {
        this.students.push(student);
    }

    apply(student: Student, stream: Stream) {
        if (student.marks >= stream.admissionCriteria) {
            console.log(`${student.name} has applied successfully for ${stream.name}.`);
            student.appliedStreams.push(stream);
        } else {
            console.log(`${student.name} is not eligible to apply for ${stream.name}.`);
        }
    }

    takeAdmission(student: Student, stream: Stream) {
        if (stream.seats > 0) {
            stream.reduceSeats(1);
            this.addStudent(student);
            console.log(`${student.name} is admitted to ${stream.name}.`);
        } else {
            console.log(`No seats available in ${stream.name} for ${student.name}.`);
        }
    }
}

interface University {
    id: string;
    name: string;
    type: string;
    colleges: College[];
    register: (college: College) => void;
    remove: (college: College) => void;
}

class UniversityImpl implements University {
    id: string;
    name: string;
    type: string;
    colleges: College[];

    constructor(id: string, name: string, type: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.colleges = [];
    }

    register(college: College) {
        this.colleges.push(college);
    }

    remove(college: College) {
        this.colleges = this.colleges.filter(col => col.id !== college.id);
    }
}

interface Search {
    isSatisfied: (college: College) => boolean;
}

class SearchByName implements Search {
    item: string;

    constructor(item: string) {
        this.item = item;
    }

    isSatisfied(college: College) {
        return college.name === this.item;
    }
}

class SearchByStream implements Search {
    item: string;

    constructor(item: string) {
        this.item = item;
    }

    isSatisfied(college: College) {
        return college.streams.some(stream => stream.name === this.item);
    }
}

class BetterSearch {
    search(colleges: College[], spec: Search) {
        return colleges.filter(college => spec.isSatisfied(college));
    }
}

const university = new UniversityImpl("1", "Tech University", "Public");
const college = new CollegeImpl("1", "Engineering College", 300);
const stream: Stream = {
    id: "1",
    name: "Computer Science",
    admissionCriteria: 90,
    seats: 50,
    subjects: ["CS101", "CS102"],
    reduceSeats(count: number) {
        this.seats -= count;
    }
};

college.addStream(stream);
university.register(college);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter student ID: ', (id) => {
    rl.question('Enter student name: ', (name) => {
        rl.question('Enter student marks: ', (marks) => {
            const student: Student = {
                id,
                name,
                marks: parseInt(marks),
                appliedStreams: []
            };

            rl.question('Enter stream name to apply for: ', (streamName) => {
                const selectedStream = college.streams.find(s => s.name === streamName);

                if (selectedStream) {
                    college.apply(student, selectedStream);

                    rl.question('Do you want to take admission? (yes/no): ', (answer) => {
                        if (answer.toLowerCase() === 'yes') {
                            college.takeAdmission(student, selectedStream);
                        }

                        const search = new BetterSearch();
                        const results = search.search(university.colleges, new SearchByName("Engineering College"));
                        console.log(results);
                        rl.close();
                    });
                } else {
                    console.log(`Stream ${streamName} not found.`);
                    rl.close();
                }
            });
        });
    });
});
