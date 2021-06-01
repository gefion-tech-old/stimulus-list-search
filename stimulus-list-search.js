/*
	Событие stimulus-list-search-end
    
    {
    	detail: {
        	search: String,
            actualItems: Array,
            notActualItems: Array
        }
    }
*/
class ListSearchController extends Stimulus.Controller {
	static targets = ['item']
    
    static classes = ['on', 'off']
    
    static values = {
    	search: String
    }

    searchValueChanged() {
    	let actualItems = this.itemTargets.filter(item => {
        	if (item.dataset.searchItem) {
            	return item.dataset.searchItem
                	.toLowerCase()
                    .includes(this.searchValue.toLowerCase())
            } else {
            	return
            }
        })
        
        let notActualItems = this.itemTargets.filter(item => {
        	return !actualItems.includes(item)
        })
        
        this.itemClassManagement(actualItems, true)
        this.itemClassManagement(notActualItems, false)
        
        this.element.dispatchEvent(new CustomEvent('stimulus-list-search-end', {
        	detail: {
            	search: this.searchValue,
                actualItems: actualItems,
                notActualItems: notActualItems
            }
        }))
    }
    
    search({ currentTarget }) {
    	if (currentTarget.dataset.search) {
        	this.searchValue = currentTarget.dataset.search
        } else {
        	this.searchValue = currentTarget.value
        }
    }
    
    itemClassManagement(items, status) {
    	let onClasses = this.hasOnClass ? this.onClass.split(' ') : []
        let offClasses = this.hasOffClass ? this.offClass.split(' ') : []
        
        items.forEach(item => {
        	if (status) {
            	offClasses.forEach(className => {
                    item.classList.remove(className)
                })
				
                if (onClasses.length > 0) {
                	item.classList.add(...onClasses)
                }
            } else {
            	onClasses.forEach(className => {
                	item.classList.remove(className)
                })
                
                if (offClasses.length > 0) {
                	item.classList.add(...offClasses)
                }
                
            }
        })
    }
}

(function() {
    let application;

    if (window.stimulusApplication) {
        application = window.stimulusApplication
    } else {
        application = Stimulus.Application.start()
    }

    application.register('list-search', ListSearchController)

    window.stimulusApplication = application
})()
