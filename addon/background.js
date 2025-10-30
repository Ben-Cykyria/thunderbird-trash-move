// i18n Helper
function formatMessage(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] || match);
}

function getMessage(name, substitutions) {
  return browser.i18n.getMessage(name, substitutions);
}

async function findTrashAndJunkFolders(folders) {
  let foldersFound = [];

  for (let folder of folders) {
    // Typ Trash oder Junk aufnehmen
    if (folder.type === "trash" || folder.type === "junk") {
      foldersFound = foldersFound.concat([folder]);
    }
    if (folder.subFolders && folder.subFolders.length > 0) {
      foldersFound = foldersFound.concat(await findTrashAndJunkFolders(folder.subFolders));
    }
  }

  return foldersFound;
}

async function moveTrashAndJunkToLocalTrash() {
  console.log(getMessage("logStart"));

  let accounts = await browser.accounts.list();

  // Lokales Konto ermitteln (type none oder Name enthält lokal)
  let localAccount = accounts.find(acc => acc.type === "none" || acc.name.toLowerCase().includes("lokal"));
  if (!localAccount) {
    console.error(getMessage("logNoLocalAccount"));
    return;
  }
  let localTrashFolders = await findTrashAndJunkFolders(localAccount.folders);
  if (localTrashFolders.length === 0) {
    console.error(getMessage("logNoLocalAccount"));
    return;
  }
  let localTrashFolder = localTrashFolders[0];

  for (let account of accounts) {
    // Lokales Konto überspringen
    if (account === localAccount) continue;

    let folders = await findTrashAndJunkFolders(account.folders);

    for (let folder of folders) {
      let messages = await browser.messages.list(folder.id);

      for (let msg of messages.messages) {
        try {
          await browser.messages.move([msg.id], localTrashFolder.id);
          let template = getMessage("logMoved");
          console.log(formatMessage(template, { subject: msg.subject }));
        } catch (e) {
          console.error(`Error moving message ${msg.id}:`, e);
        }
      }
    }
  }
}

browser.browserAction.onClicked.addListener(() => {
  moveTrashAndJunkToLocalTrash().catch(console.error);
});
