from filament.logic.type_checking import export_models, rebuild_models, beartype_models
from .remote_task_type import FilamentRemoteTaskType
from .remote_task_run import FilamentRemoteTaskRun
from .remote_task_result import FilamentRemoteTaskResult

MODELS = [
    FilamentRemoteTaskType,
    FilamentRemoteTaskRun,
    FilamentRemoteTaskResult,
]


export_models(MODELS)
rebuild_models(MODELS)
beartype_models(MODELS)
