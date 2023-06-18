import {ItemView, WorkspaceLeaf, Plugin, TFolder, TFile } from "obsidian"

export const FVIEW_TYPE = 'folder-view'

export class FolderView extends ItemView {
    plugin: Plugin

    folderContainer: any
    selectedFolder: TFolder | null

    constructor(leaf: WorkspaceLeaf, plugin: Plugin) {

        super(leaf);

        this.plugin = plugin
    }

    getViewType() {
        return FVIEW_TYPE;
    }

    getDisplayText() {
        return "Example view";
    }

    getFolders() {

    }

    async onOpen() {

    }

    async onClose() {

    }
}
