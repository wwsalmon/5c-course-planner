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
                <img src="/sz.jpg" alt="Photo of Samson Zhang" className="w-12 h-12 rounded-full mr-6"/>
                <code>hi i'm samson [they/them] (po25)! thanks for checking out my app</code>
            </div>
            <video src="/demo.mp4" autoPlay={true} muted={true} loop={true} className="my-8 rounded shadow-md"></video>
            <div className="prose mt-16">
                <h2>Why did you make this?</h2>
                <p>I was trying to figure out what classes to take next semester and it was hard :( so I made this instead of actually figuring it out</p>
                <h2>Can I see what requirements are fulfilled?</h2>
                <p>At the moment, not automatically, because:</p>
                <ol>
                    <li>I don't have the data. There are five schools and more than a hundred different majors, whose requirements all change every few years. It would require a lot of labor to collect and maintain a structured version of all this information.</li>
                    <li>I made this project over break to procrastinate other work and didn't get around to it</li>
                </ol>
                <p>That being said, I can see a few easy ways to add similar functionality:</p>
                <ul>
                    <li>Make a manual requirement checklist so you can add your own general and major requirements and check them off as you plan</li>
                    <li>Build some sort of social feature so you can share plans with others. This way major liaisons could create template schedules and post them publicly</li>
                </ul>
                <p>Let me know if you have ideas or want to contribute! (see also "can I contribute" below)</p>
                <h2>How does this app work?</h2>
                <p>It's built using React (NextJS). One big state variable contains all course lists, and is saved to localStorage every time a change is made. That means that if you close and open the website in the same browser, all your data should still be there, without the uploading of any data to any servers.</p>
                <p>See the <a href="https://github.com/wwsalmon/5c-course-planner">source code on GitHub</a>.</p>
                <h2>Where does course data come from?</h2>
                <p>Ethan Vasquez HM '25's <a href="https://github.com/IonImpulse/fivec-scheduler-server">GitHub for 5scheduler.io</a>, with duplicate courses cleaned out. There are some courses missing, which is why this planner has a custom course feature.</p>
                <h2>I code (or want to) too, can I contribute?</h2>
                <p>Yeah! This project is <a href="https://github.com/wwsalmon/5c-course-planner">open-source on GitHub</a> and I have <a
                    href="https://webdevformakers.vercel.app/">an entire video course</a> on how to make webapps using the same stack as this project. Feel free to make a fork and open a PR.</p>
            </div>
        </div>
    )
}