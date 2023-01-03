import data from "../data_5scheduler.json";
import CourseShell from "./CourseShell";
import {SemState} from "../pages";

export default function MajorCourse({courseKey, appState}: {courseKey: string, appState: SemState[]}) {
    const thisCourse = data.find(d => d.identifier === courseKey) || {
        title: "Unknown course",
        identifier: courseKey,
        source: "Unknown",
        custom: true,
    };

    const allCourses = Array.from(new Set(appState.reduce((a, b) => [...a, ...b.courses],[])));

    const courseDone = allCourses.includes(courseKey);

    return (
        <CourseShell thisCourse={thisCourse} className="opacity-50">
        </CourseShell>
    );
}