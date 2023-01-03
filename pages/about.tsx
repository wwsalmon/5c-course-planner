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
                <h2>Can I see what major requirements are fulfilled?</h2>
                <p>This is a WIP feature. Click the "major requirements" button in the top right in the app to try it out.</p>
                <p>Only a few majors are available right now because I'm adding them all myself by hand. If you want to help add your major (no coding required) please reach out!</p>
                <h2>How can I get in touch with you?</h2>
                <p>For now (winter break) I'll be posting updates about the app on Instagram. Message me there with feedback or if you want to help. My username is <code>@samsonzhangthesalmon</code>.</p>
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