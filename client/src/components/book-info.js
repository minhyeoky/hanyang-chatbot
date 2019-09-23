import { LitElement, html } from 'lit-element'
import { loadXhr, scrollToLast } from '../libs/actions.js'

class BookInfo extends LitElement {	
	static get properties() {
		return { 
			searchText: { type: String},
			imageSrc: { type: Array },
			title: { type: Array },
			author: { type: Array },
			publication: { type: Array },
			isCheckout: { type: Array },
			noBookMessage: { type: String },
		}
	}
    
	constructor() {
		super()
        
		this.imageSrc = []
		this.title = []
		this.author = []
		this.publication = []
		this.isCheckout = []
		this.noBookMessage = ``
	}
    
	createRenderRoot() {
		return this
	}
    
	firstUpdated() {
		this.getBookData(this.searchText)
	}
    
	updated() {
		scrollToLast()
	}

	render() {
		return html`
        ${style}
        ${this.noBookMessage}
        ${this.title.map((book, index) => html`
        <div class="book-list">
            <div class='image-wrap'><img class='book-image' src='${this.imageSrc[index]}' /></div>
            <div class='info'>
                <div class='title'>${book}</div>
                <div class='author'>${this.author[index]}</div>
                <div class='publication'>${this.publication[index]}</div>
                <div class='isCheckout'>${this.isCheckout[index] ? html`<span class="can-borrow">대출 가능</span>` : html`<span class="not-borrow">대출 불가</span>`}</div>
            </div>
        </div>
        `)}        
		`
	}
    
	async getBookData(text = this.searchText) {
		let res = await loadXhr({
			url: `https://lib.hanyang.ac.kr/pyxis-api/2/collections/6/search?all=k%7Ca%7C${text}&rq=BRANCH%3D9`,
			method: `GET`,
		})

		res = JSON.parse(res)
        
		if (res.code === `success.noRecord`) {
			this.noBookMessage = `검색된 결과가 없어.`
			return 
		}

		for (let i=0; i <3; i++) {
			this.title = [...this.title, res[`data`][`list`][i][`titleStatement`]]
			this.author = [...this.author, res[`data`][`list`][i][`author`]]
			this.publication = [...this.publication, res[`data`][`list`][i][`publication`]]
			this.imageSrc = [...this.imageSrc, res[`data`][`list`][i][`thumbnailUrl`]]
			this.isCheckout = [...this.isCheckout, res[`data`][`list`][i][`branchVolumes`]
				.find(each => each.name.indexOf(`ERICA`))[`cState`]]
		}
	}
}

customElements.define(`book-info`, BookInfo)

const style = html`
<style>
.book-list {
    display: grid;
    grid-template-columns: 80px auto;
    max-width: 65vw;
    height: 120px;
    overflow: hidden;
    margin-top: 5px;
}

.book-list .book-image {
    width: 80px;
    height: 120px;
}

.book-list .info {
    display: grid;
    grid-template-rows: repeat(4, auto);
    height: 120px;
    padding-left: 5px;
}

.book-list .title {
    color: #0072bc;
    font-weight: bold;
    text-overflow: ellipsis;		
}

.book-list .isCheckout {
    font-weight: bold;
}

.can-borrow {
    color: green;
}

.not-borrow {
    color: red;
}
</style>
`
