namespace org.ssatguru.babylonjs.vishva.gui {
    import JQueryPositionOptions=JQueryUI.JQueryPositionOptions;
    /**
     * Provides a UI to display a tree
     */
    export class VTreeDialog {

        private _vishva: Vishva;
        private _tree: VTree;
        private _treeDiag: VDialog;
        private _refreshBtn: HTMLElement;
        private _diagHtml: string='search <input type="text">'
        +'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-search" title="filter"></span></span></button>'
        +'<hr>'
        +'<div style="height:400px;width:100%;overflow-y:auto;border-style:solid;border-color:white;display:block">'
        +'</div>'
        +'<hr>'
        +'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-plus" title="expand all"></span></span></button>'
        +'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-minus" title="collapse all"></span></span></button>'
        +'<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-refresh" title="refresh"></span></span></button>'

        constructor(vishva: Vishva,diagTitle: string,pos: JQueryPositionOptions,treeData: Array<string|object>,filter?: string,openAll?: boolean) {
            this._vishva=vishva;
            
            let diagDiv: HTMLDivElement=document.createElement("div");
            diagDiv.innerHTML = this._diagHtml;
            document.body.appendChild(diagDiv);
            
            let treeDiv:HTMLDivElement=diagDiv.getElementsByTagName("div")[0];
            
            this._treeDiag=new VDialog(diagDiv,diagTitle,pos,300);
            this._treeDiag.setResizable(true);
            this._tree=new VTree(treeDiv,treeData,filter,openAll);

            let fi: HTMLInputElement=diagDiv.getElementsByTagName("input")[0];
            let btns: NodeListOf<HTMLButtonElement>=diagDiv.getElementsByTagName("button");
            let fb: HTMLButtonElement=btns.item(0);
            let e: HTMLButtonElement=btns.item(1);
            let c: HTMLButtonElement=btns.item(2);
            this._refreshBtn=btns.item(3);
            
            fi.onchange=() => {
                this._tree.filter(fi.value.trim());
            }
            
            fb.onclick=() => {
                this._tree.filter(fi.value.trim());
            }
            e.onclick=() => {
                this._tree.expandAll();
            }
            c.onclick=() => {
                this._tree.collapseAll();
            }
        }

        public addTreeListener(treeListener: (leaf: string,path: string,isLeaf: boolean) => void=null) {
            this._tree.addClickListener(treeListener);
        }

        public addRefreshHandler(refreshHandler: () => {}) {
            this._refreshBtn.onclick=refreshHandler;
        }

        public toggle() {
            if(this._treeDiag.isOpen()) {
                this._treeDiag.close();
            } else {
                this._treeDiag.open();
            }
        }

        public setModal(b: boolean) {
            this._treeDiag.setModal(b);
        }

        public open() {
            this._treeDiag.open();
        }
        public isOpen(): boolean {
            return this._treeDiag.isOpen();
        }
        public close() {
            this._treeDiag.close();
        }
        public refresh(treeData: Array<string|object>) {
            this._tree.refresh(treeData);
        }

        private _createHTML(): string {
            let html: string='search <input id="srchInp" type="text">'
                +'<button id="srchBtn" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-search" title="filter"></span></span></button>'
                +'<hr>'
                +'<div id="tree" style="height:400px;width:100%;overflow-y:auto;border-style:solid;border-color:white;display:block">'
                +'</div>'
                +'<hr>'
                +'<button id="expandAll" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-plus" title="expand all"></span></span></button>'
                +'<button id="collapseAll" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-minus" title="collapse all"></span></span></button>'
                +'<button id="treeRefresh" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-refresh" title="refresh"></span></span></button>'
            return html;
        }

    }
}