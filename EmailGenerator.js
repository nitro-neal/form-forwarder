// export default class EmailGenerator {
//   constructor() {
//     this.bodyMsg = `
//     <h1 style="text-align: center; color: #2a878f;"><span style="color: #2a878f;">Form Forwarder</span><span style="color: #000000; font-size: 14px;">&nbsp;</span></h1>
//     <p>&nbsp;</p>
//     <h2 style="text-align: center; color: #2a878f;">You have a new message from form forwarder:</h2>
//     <table style="padding: 30px; width: 500px; margin-left: auto; margin-right: auto;">
//     <tbody>
//     TABLE_ROWS
//     </tbody>
//     </table>
//     <p>&nbsp;</p>
//     <p style="text-align: center; color: #2a878f;"><strong>This was sent to you from </strong><a href="formforwarder.xyz"><strong>Form Forwarder</strong></a></p>`;
//   }

//   addRows(keyValuePairs) {
//     let tableRows = "";
//     for (let [key, value] of Object.entries(keyValuePairs)) {
//       tableRows += `
//       <tr>
//       <td><strong>${key}</strong></td>
//       <td>${value}</td>
//       </tr>`;
//     }

//     this.bodyMsg = this.bodyMsg.replace("TABLE_ROWS", tableRows);
//   }

//   getHtml() {
//     return this.bodyMsg;
//   }
// }

// // export { EmailGenerator };s
