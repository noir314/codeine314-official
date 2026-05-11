const stripe = Stripe('pk_test_51TViiZKgo2qBSY3vlqoffEqVcz4gvffhxXopie9UQpQj4kBz0nZCSCWTNIbwK7NbbtgEGn6rnsqRddaXLH92kvJx00m9SwkdfE');
let elements;

async function openIceVault(itemName, price) {
    console.log("🧊 Opening Vault for:", itemName);
    const modal = document.getElementById('payment-modal');
    const submitBtn = document.getElementById('submit-button');
    
    // UI Update
    document.getElementById('modal-item-name').innerText = itemName;
    document.getElementById('modal-item-price').innerText = `$${price}`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    try {
        // Handshake through your specific Cloudflare Bridge
        const response = await fetch('https://dual-indices-regulation-during.trycloudflare.com/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: price * 100 })
        });
        
        const data = await response.json();
        const clientSecret = data.clientSecret;

        if (!elements) {
            elements = stripe.elements({ 
                clientSecret,
                appearance: {
                    theme: 'night',
                    variables: { 
                        colorPrimary: '#a855f7',
                        colorBackground: '#1a1a1a',
                        colorText: '#ffffff'
                    }
                }
            });
            const paymentElement = elements.create('payment');
            paymentElement.mount('#card-element');
        }
    } catch (err) {
        console.error("Vault Connection Failed:", err);
    }
}

function closeIceVault() {
    const modal = document.getElementById('payment-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}
