import data from "../data_5scheduler.json";
import CourseShell from "./CourseShell";
import {SemState} from "../pages";
import classNames from "classnames";
import {getAllCourses} from "./MajorReqSet";

export default function MajorCourse({courseKey, appState}: {courseKey: string, appState: SemState[]}) {
    const thisCourse = data.find(d => d.identifier === courseKey) || {
        title: "Unknown course",
        identifier: courseKey,
        source: "Unknown",
        custom: true,
    };

    const allCourses = getAllCourses(appState);

    const courseDone = allCourses.some(d => (typeof d === "string" ? d : d.title).match(courseKey));

    return (
        <CourseShell thisCourse={thisCourse} className={classNames(!courseDone && "opacity-50")}>
        </CourseShell>
    );
}