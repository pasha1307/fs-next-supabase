"use client"
import { useState, useEffect } from 'react';
import {supabase} from "@/lib/supabase";

export default function CoursesList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        let { data: courses, error } = await supabase.from('courses').select('*');
        if (error) console.log('Error: ', error);
        else setCourses(courses);
        setLoading(false);
    };

    if (loading) return <p>Loading...</p>;
    if (!courses.length) return <p>No courses found.</p>;

    return (
        <div>
            <h1>Courses</h1>
            {courses.map((course) => (
                <div key={course.id}>
                    <h2>{course.name}</h2>
                    <p>{course.description}</p>
                    <p>Duration: {course.duration}</p>
                    <p>Difficulty Level: {course.difficulty_level}</p>
                    <p>Price: {course.price}</p>
                </div>
            ))}
        </div>
    );
}
