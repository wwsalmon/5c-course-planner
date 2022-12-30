import SemCol from "../components/SemCol";
import SemClass from "../components/SemClass";
import SemPos from "../components/SemPos";

export default function Home() {
    return (
        <div className="max-w-full overflow-x-auto">
            <div className="flex max-h-screen items-stretch">
                <SemCol title="F22">
                    <SemPos title="Main">
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="ENGR 084 HM" title="Electronic and Magnet Circuits and Devices" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                    </SemPos>
                    <SemPos title="Main">
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                    </SemPos>
                    <SemPos title="Main">
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                    </SemPos>
                </SemCol>
                <SemCol title="S23">
                    <SemPos title="Main">
                        <SemClass id="MS 148 PO" title="Powers of Pleasure" bgColor="#8ae8e9"/>
                    </SemPos>
                </SemCol>
            </div>
        </div>
    );
}