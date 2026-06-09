from beartype.typing import Callable, Type

_MODULE_TYPE_REGISTRY: dict[str, Type | Callable] = {}


def lookup_module_type(address: str) -> Type | Callable:
    if address not in _MODULE_TYPE_REGISTRY:
        module_name, type_name = address.split(':')
        module = __import__(module_name, fromlist=[type_name])
        type_ = getattr(module, type_name)
        _MODULE_TYPE_REGISTRY[address] = type_
    return _MODULE_TYPE_REGISTRY[address]


def get_module_type_address(type_: Type | Callable) -> str:
    return f'{type_.__module__}:{type_.__qualname__}'


def register_module_type(type_: Type | Callable) -> str:
    address = get_module_type_address(type_)
    if address in _MODULE_TYPE_REGISTRY:
        return address
    _MODULE_TYPE_REGISTRY[address] = type_
    return address
