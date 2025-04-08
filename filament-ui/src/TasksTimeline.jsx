import dayjs from 'dayjs';
import { useContext } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getSince, getTaskEnd } from '@/utils';

import TaskContext from './components/TaskContext';
import { getDurationHumanReadable } from './utils';

const TasksTimeline = ({ tasks, relativeTo }) => {
    const minStart = Math.min(...tasks.map((task) => dayjs(task.createdAt).toDate().getTime()));
    const maxEnd = Math.max(...tasks.map((task) => getTaskEnd(task).getTime()));
    const spannedDuration = maxEnd - minStart;

    return (
        <div className="flex max-h-[420px] flex-col gap-2 overflow-auto">
            {tasks.map((task) => (
                <TaskTimelineRow
                    key={task.id}
                    task={task}
                    minStart={minStart}
                    spannedDuration={spannedDuration}
                    relativeTo={relativeTo}
                />
            ))}
        </div>
    );
};

const getBackgroundColor = (task) => {
    const stateColors = {
        created: 'bg-yellow-100 border-yellow-500 border',
        success: 'bg-green-100 border-green-500 border',
        failure: 'bg-red-100 border-red-500 border',
        running: 'bg-blue-100 border-blue-500 border',
        cancelled: 'bg-neutral-100 border-neutral-500 border',
        timeout: 'bg-orange-100 border-orange-500 border',
        retrying: 'bg-purple-100 border-purple-500 border',
        cached: 'bg-cyan-100 border-cyan-500 border',
    };
    return stateColors[task.state];
};

const TaskTimelineRow = ({ task, minStart, spannedDuration, relativeTo }) => {
    const { selectedTask, setSelectedTask } = useContext(TaskContext);

    const taskStart = dayjs(task.createdAt).toDate().getTime();
    const taskEnd = getTaskEnd(task).getTime();
    const taskDuration = taskEnd - taskStart;

    const left = ((taskStart - minStart) / spannedDuration) * 100;
    const width = (taskDuration / spannedDuration) * 100;

    let name = task.taskType.name;
    const durationHumanReadable = getDurationHumanReadable(taskDuration);
    const startRelative = getSince(taskStart, relativeTo);
    const endRelative = getSince(taskEnd, relativeTo);
    const tooltip = `${startRelative} - ${endRelative} (${durationHumanReadable})`;

    return (
        <div className="flex items-center">
            <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                    <div
                        style={{
                            marginLeft: `${left}%`,
                            width: `${width}%`,
                        }}
                        className={cn(
                            'cursor-pointer rounded p-1 text-nowrap hover:underline',
                            {
                                underline: selectedTask?.id === task.id,
                            },
                            getBackgroundColor(task)
                        )}
                        onClick={() => setSelectedTask(task)}
                    >
                        {name}
                    </div>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </div>
    );
};

export default TasksTimeline;
