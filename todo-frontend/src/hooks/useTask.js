import { useContext } from "react";
import { TaskContext } from "../Context/TaskContext";

export function useTask() {
    const context = useContext(TaskContext);
    return context;
}