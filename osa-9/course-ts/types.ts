export interface courseType{
  name: string;
  exerciseCount: number;
}

export interface TotalProps{
  courseParts: Array<courseType>
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  description: string;
  exerciseSubmissionLink: string;
}

interface CourseNewPart extends CoursePartBase {
  description: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

