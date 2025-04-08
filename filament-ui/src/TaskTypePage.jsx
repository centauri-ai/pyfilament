import { useQuery } from '@apollo/client';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

import ExpandableMessage from '@/components/ExpandableMessage';
import HumanTime from '@/components/HumanTime';
import { LinkTo } from '@/components/LinkTo';
import StateBadge from '@/components/StateBadge';
import TaskContext from '@/components/TaskContext';
import TaskLink from '@/components/TaskLink';

import { GET_TASK_TYPE_RUNS } from './queries';

function TaskTypePage() {
    const { taskTypeId } = useParams();
    const getTaskTypeRunsQuery = useQuery(GET_TASK_TYPE_RUNS, { variables: { id: taskTypeId } });
    const navigate = useNavigate();

    if (getTaskTypeRunsQuery.loading || getTaskTypeRunsQuery.error) {
        return <p>{getTaskTypeRunsQuery.loading ? 'Loading...' : `Error: ${getTaskTypeRunsQuery.error.message}`}</p>;
    }

    const taskType = getTaskTypeRunsQuery.data.getTaskType;
    const taskRuns = _.sortBy(taskType.taskRuns, ['createdAt']).reverse();

    return (
        <TaskContext.Provider value={{ rootTaskType: taskType }}>
            <div className="flex flex-col p-4">
                <div className="flex flex-col gap-2 pb-4 text-neutral-500">
                    <LinkTo url="/">Filament</LinkTo>
                    <div className="flex items-center gap-2 pl-4">
                        <span>/</span>
                        <TaskLink taskType={taskType} />
                    </div>
                </div>
                <div className="text-2xl font-bold">Task Runs</div>
                <div className="flex flex-col gap-4">
                    {taskRuns.map((taskRun) => (
                        <div key={taskRun.id} className="flex items-start gap-4 rounded bg-gray-100 p-4">
                            <div className="flex flex-1 gap-4">
                                <div className="flex-none">
                                    <TaskLink taskRun={taskRun} />
                                </div>
                                <div className="flex-1">
                                    {taskRun.parametersJson && (
                                        <ExpandableMessage message={taskRun.parametersJson} limit={512} />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-none items-center gap-4">
                                <div className="w-[160px] text-right">
                                    <HumanTime timestamp={taskRun.createdAt} />
                                </div>
                                <StateBadge state={taskRun.state} since={taskRun.stateSince} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TaskContext.Provider>
    );
}

export default TaskTypePage;
