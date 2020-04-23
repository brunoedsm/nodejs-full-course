(function() {
    const content = document.querySelector('.content');
    const input = document.querySelector('.message');
    const status = document.querySelector('.status');
    
    let color = null;
    let name = null;
    
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    
    if (!window.WebSocket) {
        content.innerHTML = `<p>Browser doesn't support websocket.</p>`;
        input.style.display = 'none';
    
        return;
    }

    const connection = new WebSocket('ws://localhost:3000');

    connection.addEventListener('open', () => {
        status.textContent = 'Username:';
        input.removeAttribute('disabled');
    });

    connection.addEventListener('error', error => {
        content.innerHTML = '<p>Problems with connection! Try again later.</p>';
    });

    connection.addEventListener('message', message => {
        try {
            const json = JSON.parse(message.data);
            
            input.removeAttribute('disabled');
            input.focus();

            switch (json.type) {
                case 'color': setColor(json.data); break;
                case 'history': parseHistory(json.data); break;
                case 'message': receiveMessage(json.data); break;
                default: console.log('Invalid message type', message);
            }
        } catch (e) {
            console.log('Invalid JSON', message.data);
        }
    });

    input.addEventListener('keypress', event => {
        if (event.keyCode === 13) {
            const value = event.currentTarget.value.trim();
            if (!value) return;

            connection.send(value);
            input.setAttribute('disabled', 'disabled');
            event.currentTarget.value = '';

            if (!name) {
                name = value;
            }
        }
    });

    const setColor = c => {
        color = c;
        status.textContent = `${name}`;
        status.style.color = color;
    };

    const parseHistory = messages => messages.forEach(message => receiveMessage(message));

    const receiveMessage = message => {
        const date = new Date(message.time);
        content.innerHTML += `
            <p>
                <span style="color: ${message.color}">${message.author}</span>
                @ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - 
                ${message.text}
            </p>
        `;
    }
})();