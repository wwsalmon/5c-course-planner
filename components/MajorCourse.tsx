import data from "../data_5scheduler.json";
import CourseShell from "./CourseShell";
import {CourseKey, SemState} from "../pages";
import classNames from "classnames";
import {getAllCourses} from "./MajorReqSet";
import {Course} from "./SemCourse";

export default function MajorCourse({courseKey, appState}: {courseKey: CourseKey, appState: SemState[]}) {
    const thisCourse = data.find(d => d.identifier === courseKey) || {
        title: "Unknown course",
        identifier: typeof courseKey === "string" ? courseKey : courseKey.identifier,
        source: "Unknown",
        custom: true,
    };

    const allCourses = getAllCourses(appState);

    const courseDone = allCourses.some(d => (typeof d === "string" ? d : d.title).match(typeof courseKey === "string" ? courseKey : courseKey.identifier));

    return (
        <CourseShell thisCourse={thisCourse} className={classNames(!courseDone && "opacity-50")}>
        </CourseShell>
    );
}