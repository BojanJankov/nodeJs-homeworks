import { DataService } from "./data.service.js";
import { createPath } from "../path.js";

const DATA_PATH = createPath(["data", "students.json"]);

const saveStudents = async (students) => {
  await DataService.saveJSONFile(DATA_PATH, students);
};

// Get all students
export const getAllStudents = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
    );
    const data = await response.json();
    saveStudents(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Filter function for get all students
export const getStudentsByFilter = async (filters) => {
  let students = await getAllStudents();

  if (filters?.gender) {
    students = students.filter((student) => {
      if (filters.gender === "Male") return student.gender === "Male";
      if (filters.gender === "Female") return student.gender === "Female";
    });
  }

  if (filters?.sortBy) {
    if (filters.sortBy === "age") return students.sort((a, b) => a.age - b.age);
    if (filters.sortBy === "averageGrade")
      return students.sort((a, b) => a.averageGrade - b.averageGrade);
  }

  return students;
};

export const getStudentById = async (studentId) => {
  let students = await getStudentsByFilter();

  const foundStudent = students.find((student) => student.id === studentId);

  if (!foundStudent) throw new Error("Can't find student");

  return foundStudent;
};
