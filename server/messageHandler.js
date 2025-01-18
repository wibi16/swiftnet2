// messageHandler.js

const AGENT_TYPES = {
    ORCHESTRATOR: 'orchestrator',
    WEBSURFER: 'WebSurfer',
    FILESURFER: 'FileSurfer',
    CODER: 'Coder',
    EXECUTOR: 'Executor',
    USER: 'user'
};

// Keep track of seen messages to prevent duplicates
const seenMessages = new Set();

const createMessageHash = (content) => {
    return content.replace(/\s+/g, ' ').trim().toLowerCase();
};

const segregateChat = (message) => {
    try {
        if (!message) return null;

        // Extract agent messages using regex
        const sourceMatch = message.match(/source='([^']+)'/);
        const contentMatch = message.match(/content='([^']+)'/);

        let messageObj;

        if (!sourceMatch || !contentMatch) {
            // Handle plain text messages
            const messageHash = createMessageHash(message);
            
            if (seenMessages.has(messageHash)) {
                return null;
            }
            
            seenMessages.add(messageHash);
            messageObj = {
                agent: 'system',
                content: message,
                type: 'message'
            };
        } else {
            const agent = sourceMatch[1];
            const content = contentMatch[1].replace(/\\n/g, '\n');

            const messageHash = createMessageHash(content);
            
            if (seenMessages.has(messageHash)) {
                return null;
            }
            
            seenMessages.add(messageHash);

            messageObj = {
                agent,
                content,
                type: 'message'
            };
        }

        // Clear seen messages cache periodically
        if (seenMessages.size > 10000) {
            seenMessages.clear();
        }

        return messageObj;

    } catch (error) {
        console.error('Message processing error:', error);
        return {
            agent: 'system',
            content: message.toString(),
            type: 'error'
        };
    }
};

module.exports = { segregateChat, AGENT_TYPES };