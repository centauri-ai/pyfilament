import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApolloContext from './ApolloContext';
import TanstackContext from './TanstackContext';
import TaskRunPage from './TaskRunPage';
import TaskTypePage from './TaskTypePage';
import TaskTypesPage from './TaskTypesPage';
import { TooltipProvider } from './components/ui/tooltip';

function App() {
    return (
        <TooltipProvider>
            <TanstackContext>
                <ApolloContext>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<TaskTypesPage />} />
                            <Route path="/task-type/:taskTypeId" element={<TaskTypePage />} />
                            <Route path="/task-run/:taskRunId" element={<TaskRunPage />} />
                        </Routes>
                    </BrowserRouter>
                </ApolloContext>
            </TanstackContext>
        </TooltipProvider>
    );
}

export default App;
