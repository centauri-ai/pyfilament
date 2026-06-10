from filament.logic.type_checking import beartype_models, export_models, rebuild_models

from .remote_task_result import FilamentRemoteTaskResult
from .remote_task_run import FilamentRemoteTaskRun
from .remote_task_type import FilamentRemoteTaskType

MODELS = [
    FilamentRemoteTaskType,
    FilamentRemoteTaskRun,
    FilamentRemoteTaskResult,
]


export_models(MODELS)
rebuild_models(MODELS)
beartype_models(MODELS)
