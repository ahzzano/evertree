import {ItemView, WorkspaceLeaf, Plugin, TFolder, TFile } from "obsidian"
import { MarkdownView } from 'obsidian';

export const FVIEW_TYPE = 'folder-view'

export class FolderView extends ItemView {
    plugin: Plugin

    folderContainer: HTMLElement
    noteContainer: HTMLElement
    selectedFolder: TFolder | null

    constructor(leaf: WorkspaceLeaf, plugin: Plugin) {

        super(leaf);

        this.plugin = plugin
        this.selectedFolder = this.app.vault.getRoot()
        this.folderContainer = createDiv()
        this.noteContainer = createDiv()
    }

    getViewType() {
        return FVIEW_TYPE;
    }

    getDisplayText() {
        return "Folder View";
    }

    makeFolderElement(folder: TFolder): HTMLElement {
        let folderElement = createDiv()

        folderElement.createEl('b', {text: folder.name})
        folderElement.onClickEvent((e) => {
            this.selectedFolder = folder
            this.getFolders()
            this.getNotes()
        })

        return folderElement
    }

    makeNoteElement(file: TFile): HTMLElement {
        let noteElement = createDiv()

        noteElement.createEl('span', {text: file.name})
        noteElement.onClickEvent(async (e) => {
            this.app.workspace.getLeaf().openFile(file)
        })
        

        return noteElement
    }

    getSelectedFolder(): TFolder {
        let targetFolder = this.selectedFolder

        if(targetFolder == null) {
            targetFolder = this.app.vault.getRoot()
        }
        return targetFolder
    }

    async getNotes() {
        let targetFolder = this.getSelectedFolder()
        this.noteContainer.empty()

        for(let file of targetFolder.children) {
            if(file instanceof TFolder){
                continue
            }

            this.noteContainer.appendChild(this.makeNoteElement(<TFile>file))

        }
    }

    async getFolders() {
        let targetFolder = this.getSelectedFolder()
        this.folderContainer.empty()

        for(let folder of targetFolder.children) {
            if(folder instanceof TFile){
                continue
            }
            this.folderContainer.appendChild(this.makeFolderElement(<TFolder>folder))
        }
    }

    async onOpen() {
        const mainContainer = this.contentEl

        mainContainer.createEl('h1', {text: 'Folders'})
        mainContainer.append(this.folderContainer)
        await this.getFolders()

        mainContainer.createEl('h1', {text: 'Notes'})
        mainContainer.append(this.noteContainer)
        await this.getNotes()


    }

    async onClose() {

    }
}
