import {Course} from "./SemCourse";

export default function CourseInner({thisCourse}: {thisCourse: Course}) {
    return (
        <div className="my-2">
            <p className="mb-2 text-lg font-bold leading-tight">{thisCourse.title}</p>
            {"custom" in thisCourse ? (
                <p>Custom course added by user</p>
            ) : (
                <>
                    {!!thisCourse.instructors.length && (
                        <p className="mb-2 opacity-75">{thisCourse.instructors.join(", ")}</p>
                    )}
                    <p className="">{thisCourse.description || "No description in catalog"} {thisCourse.prerequisites && `Prerequisites: ${thisCourse.prerequisites}.`} {thisCourse.corequisites && `Corequisites: ${thisCourse.corequisites}`}</p>
                </>
            )}
        </div>
    )
}