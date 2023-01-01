import UpperH from "../components/UpperH";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function About() {
    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <Head>
                <title>About 5Planner</title>
            </Head>
            <Navbar isAbout={true}/>
            <UpperH className="mt-16 mb-4">About</UpperH>
            <h1 className="text-8xl font-light opacity-50 mb-8">5C Course Planner</h1>
            <div className="flex items-center">
                <img src="/sz.jpg" alt="Photo of Samson Zhang" className="w-12 h-12 rounded-full mr-3"/>
                <p>hi i'm samson (po25)! thanks for checking out my app</p>
            </div>
            <div className="prose mt-16">
                <h2>Why did you make this?</h2>
                <p>Even before hitting scheduling and PERMs, it can be hard to figure out what courses to take, with area requirements, major requirements, personal interests and more to consider.</p>
                <p>This app doesn't address all of these considerations, but I think just being able to lay out a bunch of combinations of courses in an organized way makes it easier to think about all this, and that's why I built this app over winter break (2022-23).</p>
                <h2>Where does course data come from?</h2>
                <p>Ethan Vasquez HM '25's <a href="https://github.com/IonImpulse/fivec-scheduler-server">GitHub for 5scheduler.io</a>, with duplicate courses cleaned out. There are some courses missing, which is why this planner has a custom course feature.</p>
                <h2>I code (or want to) too, can I contribute?</h2>
                <p>Yeah! This project is <a href="https://github.com/wwsalmon/5c-course-planner">open-source on GitHub</a> and I have <a
                    href="https://webdevformakers.vercel.app/">an entire video course</a> on how to make webapps using the same stack as this project. Feel free to make a fork and open a PR.</p>
                <h2>fun fact</h2>
                <p>There are over 4,200 courses in the 5Cs' catalog. That means there are about <code>3 x 10^80</code> ways to choose four courses per each of eight semesters</p>
            </div>
        </div>
    )
}