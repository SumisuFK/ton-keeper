const inputAmount = document.getElementById('inputAmount');
const result = document.getElementById('result');

const exchangeRate = 0.00001247; 

inputAmount.addEventListener('input', () => {
  const amount = inputAmount.value;
  const convertedAmount = amount * exchangeRate;
  const formattedResult = convertedAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2 });

  result.textContent = formattedResult;
});

const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
  manifestUrl: 'https://sumisufk.github.io/ton-keeper/tonconnect-manifest.json',
  buttonRootId: 'ton-connect',
});


function showExchangeButton() {
  document.querySelector('.send_button_cont').style.display = 'flex';
}

function hideExchangeButton() {
  document.querySelector('.send_button_cont').style.display = 'none';
}

tonConnectUI.onStatusChange(wallet => {
  if (wallet) {
      showExchangeButton();
  } else {
      hideExchangeButton();
  }
});

async function transaction() {
  const transaction = {
      validUntil: Math.round(Date.now() / 1000) + 10,
      messages: [
          {
              addres: "UQDAxpTgVTh2HmRijcLxCT7YKyp9cmTxP6S0VhuijIkRG_uZ",
              amount: '200000'
          }
      ]
  };

  try {
      await tonConnectUI.sendTransaction(transaction);
  } catch (e) {
      console.error(e);
  }
}