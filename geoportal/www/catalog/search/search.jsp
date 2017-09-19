<%--
 See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 Esri Inc. licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
--%>
<% 
// If parameter is set then authentication is mandatory
 com.esri.gpt.framework.context.RequestContext rcx = com.esri.gpt.framework.context.RequestContext.extract(request);
 String sAllowOnlyAuthenticatedUser=rcx.getApplicationConfiguration().getCatalogConfiguration().getParameters().getValue("AllowOnlyAuthenticatedUser");
 if ("true".equals(sAllowOnlyAuthenticatedUser)&&(!rcx.getUser().getAuthenticationStatus().getWasAuthenticated())) {
		 response.sendRedirect(request.getContextPath() + "/catalog/identity/login.page");
	}
%>

 <% // search.jsp - Search page(tiles definition) %>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@taglib prefix="gpt" uri="http://www.esri.com/tags-gpt"%>

<% // initialize the page %>
<gpt:page id="catalog.search.home"
  prepareView="#{SearchController.prepareView}"/>
<tiles:insertDefinition name=".gptLayout" flush="false" >
  <tiles:putAttribute name="body" value="/catalog/search/searchBody.jsp"/>
</tiles:insertDefinition>
