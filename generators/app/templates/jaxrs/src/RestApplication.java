package org.jetservice;

import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.ConfigurationPolicy;
import org.osgi.service.component.annotations.Modified;
import org.osgi.service.component.annotations.Reference;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import com.liferay.portal.configuration.metatype.bnd.util.ConfigurableUtil;
import com.liferay.portal.kernel.service.UserLocalService;

/*
 * A sample application to demonstrate implementing a JAX-RS endpoint in DXP
 */
@Component(immediate=true, 
           service=Application.class,
           configurationPid = "<%=serviceName%>",
           configurationPolicy = ConfigurationPolicy.OPTIONAL,
           property={"jaxrs.application=true"} 
)
@ApplicationPath("<%=servicePath%>")
public class RestApplication extends Application {

    public RestApplication() {
        super();

        //add the automated Jackson marshaller for JSON
        this.singletons.add(new JacksonJsonProvider());

        // add our REST endpoints (resources)
        this.singletons.add(new PeopleResource());
    }
	
	/*
	 * Register our JAX-RS providers and resources
	 */
	@Override
	public Set<Object> getSingletons() {
		return this.singletons;
	}
	
	/*
	 * Management of the Liferay UserLocalService class provided to us an OSGi service.
	 * Provided as an example of how to access DXP services from a JAX-RS service
	 */
	@Reference
	public void setUserLocalService(UserLocalService userLocalService) {
		this._userLocalService = userLocalService;
	}
	
	UserLocalService getUserLocalService() {
		return this._userLocalService;
	}

	/*
	 * This method demonstrates how you can perform logic when your bundle is activated/updated. For simplicity's
	 * sake we print a message to the console--this is particularly useful during update-style deployments. 
	 * 
	 * This method will also be invoked when the OSGi configuration changes for this bundle and we reflect that
	 * by printing out the current value of our configuration object.
	 */
	@Activate
	@Modified
	public void activate(Map<String, Object> properties) {
	
		System.out.println("The sample DXP REST app has been activated/updated at " + new Date().toString());
		
		/*
		 * Demonstrate updates to the configuration object for this bundle. 
		 */
	
		this._restConfiguration = ConfigurableUtil.createConfigurable(RestApplicationConfiguration.class, properties);
		
		if (this._restConfiguration != null) {
			System.out.println("For sample DXP REST config, info=" + this._restConfiguration.info());
			System.out.println("For sample DXP REST config, infoNum=" + this._restConfiguration.infoNum());
		} else {
			System.out.println("The sample DXP REST config object is not yet initialized");
		}
	}
	
	private RestApplicationConfiguration _restConfiguration;
    private Set<Object> singletons = new HashSet<Object>();
    private UserLocalService _userLocalService;
}