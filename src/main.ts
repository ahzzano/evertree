import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting  } from 'obsidian';

import {FolderView, FVIEW_TYPE} from './folderview'

interface PluginSettings {
	mySetting: string
}

const DEFAULT_SETTINGS: PluginSettings = {
	mySetting: 'default'
}

export default class Evertree extends Plugin {
	settings: PluginSettings;

	async onload() {
		await this.loadSettings();
        this.registerView(FVIEW_TYPE, (leaf) => new FolderView(leaf, this))

        this.addRibbonIcon('note', 'Open Evertree', () => {
            this.activateView()
        })

    }

    async loadSettings(){

    }

    async activateView(){
        await this.app.workspace.getRightLeaf(false).setViewState({
          type: FVIEW_TYPE,
          active: true,
        });

        this.app.workspace.revealLeaf(
          this.app.workspace.getLeavesOfType(FVIEW_TYPE)[0]
        );
    }
}
