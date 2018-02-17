namespace org.ssatguru.babylonjs.vishva.gui {
    import Vector2=BABYLON.Vector2;
    /**
     * provides a ui to input a vector2 value
     */
    export class InputVector2{

        private _v:Vector2;
        private _x:InputNumber;
        private _y:InputNumber;
        
        constructor (v3eID :string,v?:Vector2){
            if (v){
                this._v=v.clone();
            }else{
                this._v=new Vector2(0,0);
            }
            
            this._x=new InputNumber(v3eID,this._v.x);
            this._x.onChange=(n)=>{
                this._v.x=n;
            }
            
            this._y=new InputNumber(v3eID,this._v.y);
            this._y.onChange=(n)=>{
                this._v.y=n;
            }
           
        }
        
        public getValue():Vector2{
            return this._v;
        }
        
        public setValue(v:Vector2){
            
            this._v.x=v.x;
            this._v.y=v.y;
            
            this._x.setValue(v.x);
            this._y.setValue(v.y);
            
        }
        
        
    }
}