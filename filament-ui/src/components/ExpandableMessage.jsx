import { useState } from 'react';

import JSONExpandableMessage from '@/components/JSONExpandableMessage';
import { LinkTo } from '@/components/LinkTo';
import { Dialog, DialogContent } from '@/components/ui/dialog';

function ExpandableMessage({ message, limit = 128 }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isAbbreviated = message.length > limit;
    const abbreviatedMessage = isAbbreviated ? message.slice(0, limit) + '...' : message;
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div>
                {!isAbbreviated ? (
                    <JSONExpandableMessage message={message} />
                ) : (
                    <div>
                        <div className="break-all">{abbreviatedMessage}</div>
                        <div className="text-right">
                            <LinkTo onClick={() => setIsDialogOpen(true)}>[Show full]</LinkTo>
                        </div>
                    </div>
                )}
            </div>
            <DialogContent className="max-h-[640px] max-w-[800px] overflow-y-auto sm:max-w-[800px]">
                <JSONExpandableMessage message={message} isExpanded={true} />
            </DialogContent>
        </Dialog>
    );
}

export default ExpandableMessage;
