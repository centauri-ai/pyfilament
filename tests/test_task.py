import anyio

from filament.filament import task
from filament.hooks import create_all_task_type_states


@task
async def _run_parent():
    await anyio.sleep(0.1)
    result = await _run_child()
    await anyio.sleep(0.1)
    return f'parent, {result}'


@task
async def _run_child():
    await anyio.sleep(0.1)
    return 'child'


async def test_task():
    await create_all_task_type_states()
    result = await _run_parent()
    assert result == 'parent, child'
