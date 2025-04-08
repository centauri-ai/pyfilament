import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

function LinkTo({ url = null, onClick = null, disabled = false, children }) {
    const navigate = useNavigate();
    onClick = onClick ? onClick : url ? () => navigate(url) : () => {};
    return (
        <div
            onClick={onClick}
            className={cn({
                'cursor-pointer text-blue-500 select-none hover:underline': !disabled,
                'cursor-not-allowed text-neutral-500 line-through': disabled,
            })}
        >
            {children}
        </div>
    );
}

export { LinkTo };
