let history = [];

function sumOfDigits(phoneNumber) {
  if (!phoneNumber) return null;

  let digits = phoneNumber.replace(/\D/g, "");
  let sum = 0;
  for (let digit of digits) {
    sum += parseInt(digit);
  }

  while (sum > 9) {
    let tempSum = 0;
    while (sum > 0) {
      tempSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = tempSum;
  }

  return sum;
}

function describeLuckyNumber(luckyNumber) {
  switch (luckyNumber) {
    case 1:
      return "Tự lập, sáng tạo, có thể dẫn đầu.";
    case 2:
      return "Hòa đồng, hợp tác, nhân từ.";
    case 3:
      return "Sáng tạo, năng động, đam mê.";
    case 4:
      return "Cẩn thận, chịu khó, ổn định.";
    case 5:
      return "Tự do, phiêu lưu, thích thú thú vị.";
    case 6:
      return "Tình yêu gia đình, trách nhiệm, nhân từ.";
    case 7:
      return "Suy nghĩ sâu sắc, nghiên cứu, sự thật.";
    case 8:
      return "Tham vọng, quyền lực, thành công.";
    case 9:
      return "Nhân hậu, nhân từ, nhạy cảm.";
    default:
      return "";
  }
}

function handleInputChange(event) {
  const phoneNumber = event.target.value;
  const luckyNumber = sumOfDigits(phoneNumber);
  const description = describeLuckyNumber(luckyNumber);

  if (phoneNumber) {
    const existingIndex = history.findIndex(
      (item) => item.phoneNumber === phoneNumber
    );

    if (existingIndex !== -1) {
      history[existingIndex].count += 1;
    } else {
      history.unshift({
        phoneNumber,
        luckyNumber,
        description,
        count: 1,
      });
    }

    displayHistory();
    displayDescriptions();
  }

  document.getElementById("luckyNumber").innerText =
    luckyNumber !== null ? luckyNumber : "";
  document.getElementById("description").innerText = description;
}

function displayHistory() {
  const historyContainer = document.getElementById("history");
  historyContainer.innerHTML = `
    <table class="history-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Phone</th>
          <th>Number</th>
          <th>Count</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${history
          .map(
            (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.phoneNumber}</td>
            <td>${item.luckyNumber}</td>
            <td>${item.count}</td>
            <td><button class="delete-button" onclick="deleteItem(${index})">Xóa</button></td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function deleteItem(index) {
  history.splice(index, 1);
  displayHistory();
}

function displayDescriptions() {
  const descriptionsContainer = document.getElementById("descriptions");
  descriptionsContainer.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map(
      (num) => `
    <p><strong>${num}:</strong> ${describeLuckyNumber(num)}</p>
  `
    )
    .join("");
}

window.onload = displayDescriptions;
