## Building Lightning Components with React

This project demonstrates how to build a Lightning Component with React, or in other words, how to host a React Component inside a Lightning Component. The example used in this project is a simple Contact Search component fully implemented in React.

See [this blog](http://coenraets.org/blog/2016/02/creating-lightning-components-with-react/) post for more detailed information.


### Building and Running the Component Locally

1. Clone this repository

1. Open a command prompt and navigate (cd) to the `lightning-react` directory

1. Install the dependencies:
    ```
    npm install
    ```
    
1. Build the project:    
    ```
    npm run webpack
    ```
    
    The transpiled file is available in the **build** directory.
    
1. Test locally. This project includes a mock.js file that simulates a Lightning Component so that you can test your React code locally before deploying it in your Salesforce org. To test the app locally, open `index.html` in your browser and type a few characters in the search box.


### Hosting the React Component in a Lightning Component
    
1. In the Developer Console, create an Apex Class named **ContactController** implemented as follows:
     ```
    public with sharing class ContactController {
    
        @AuraEnabled
        public static List<Contact> findAll() {
            return [SELECT Id, Name from Contact limit 20];
        }
    
        @AuraEnabled
        public static List<Contact> findByName(String name) {
            String key = '%' + name + '%';
            return [SELECT Id, Name FROM Contact WHERE Name LIKE :key LIMIT 20];
        }
    }
     ```

    NOTE: In a production environment, you should add code to the controller's methods to enforce CRUD and FLS.

    
1. Create a **Static Resource** named **ReactSearch**. Upload the `search.bundle.js` file available in the `build` directory.

1. Install the Lightning Design System: On the <a href="https://www.lightningdesignsystem.com/resources/downloads/">downloads page</a>, click <strong>v0.12.2 unmanaged package</strong>, then click the <strong>Install</strong> button. This will install the Lightning Design System as a static resource in your org.

1. In the Developer Console, create a new Lightning Component (File > New > Lightning Component) named **ReactSearch** implemented as follows:
    ```
    <aura:component controller="ContactController">
        
        <ltng:require scripts="/resource/ReactSearch"
                      styles="/resource/SLDS0122/assets/styles/salesforce-lightning-design-system-ltng.css"
                      afterScriptsLoaded="{!c.reactInit}"/>
        
        <div aura:id="container"/>
        
    </aura:component>
    ```

1. Click **CONTROLLER** (upper right corner) and implement the component's controller as follows:

    ```
    ({
        reactInit : function(component, event, helper) {
            var dataService = {
                findAll : $A.getCallback(function(callback) {
                    var action = component.get("c.findAll");
                    action.setCallback(this, function(a) {
                        var contacts = a.getReturnValue();
                        callback(contacts);
                    });
                    $A.enqueueAction(action, false);
                }),
                findByName : $A.getCallback(function(name, callback) {
                    var action = component.get("c.findByName");
                    action.setParams({name: name});
                    action.setCallback(this, function(a) {
                        var contacts = a.getReturnValue();
                        callback(contacts);
                    });
                    $A.enqueueAction(action, false);
                })
            }
            
            var container = component.find("container").getElement();
    
            reactSearch.init(container, dataService);
            
        }
    })
    ```

1. Create a new Lightning Application (File > New > Lightning Component) named **ReactSearchApp** implemented as follows:
    ```
    <aura:application >
        
        <c:ReactSearch />
        
    </aura:application>
    ```
    
1. Click **Preview** (Upper Right Corner) to run the app. Enter a few characters in the search box to search contacts by name.
