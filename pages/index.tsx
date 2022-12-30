import SemCol from "../components/SemCol";
import SemClass from "../components/SemClass";
import SemPos from "../components/SemPos";

let thisYear = new Date().getFullYear();
let thisMonth = new Date().getMonth() + 1;

if (thisMonth === 12) {
    thisYear++;
    thisMonth = 1;
}

const thisSeason = +(thisMonth > 4);
const thisSemester = 2 * thisYear + thisSeason;
const firstSemester = thisSemester - 2;
const lastSemester = thisSemester + 2;

function decodeSemester(semNum: number) {
    return (semNum % 2 ? "F" : "S") + (Math.floor(semNum / 2)).toString().substring(2);
}

console.log(decodeSemester(thisSemester), decodeSemester(firstSemester), decodeSemester(lastSemester));

export default function Home() {
    return (
        <div className="max-w-full overflow-x-auto">
            <div className="flex max-h-screen items-stretch">
                {Array(5).fill(0).map((d, i) => firstSemester + i).map(d => (
                    <SemCol title={decodeSemester(d)} key={d} dark={d < thisSemester}/>
                ))}
                {/*<SemCol title="F22" dark={true}>*/}
                {/*    <SemPos title="Main">*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="ENGR 084 HM" title="Electronic and Magnet Circuits and Devices" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*    </SemPos>*/}
                {/*    <SemPos title="Main">*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*    </SemPos>*/}
                {/*    <SemPos title="Main">*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*    </SemPos>*/}
                {/*</SemCol>*/}
                {/*<SemCol title="S23">*/}
                {/*    <SemPos title="Main">*/}
                {/*        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>*/}
                {/*    </SemPos>*/}
                {/*</SemCol>*/}
            </div>
        </div>
    );
}