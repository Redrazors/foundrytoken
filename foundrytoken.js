Hooks.once('init', async () => {
    await createFolderIfMissing("foundrytokens");
});



function createFolderIfMissing(folderPath) {
    const source = game.settings.get("dragupload", "fileUploadSource");
    try{
        let result = await FilePicker.browse(source, folderPath);
        if ( !result.dir.includes(folderPath) ) await FilePicker.createDirectory(source, folderPath, source === "s3" ? { bucket: game.settings.get("dragupload", "fileUploadBucket") } : {});
    }catch (error){
        try {
            await FilePicker.createDirectory(source, folderPath, source === "s3" ? {bucket: game.settings.get("dragupload", "fileUploadBucket")} : {});
        }
        catch {}
    }
}