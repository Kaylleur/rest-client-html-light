var xt="",h3OK=1
function checkErrorXML(x)
{
    xt=""
    h3OK=1
    checkXML(x)
}

function checkXML(n)
{
    var l,i,nam
    nam=n.nodeName
    if (nam=="h3")
    {
        if (h3OK==0)
        {
            return;
        }
        h3OK=0
    }
    if (nam=="#text")
    {
        xt=xt + n.nodeValue + "\n"
    }
    l=n.childNodes.length
    for (i=0;i<l;i++)
    {
        checkXML(n.childNodes[i])
    }
}



function validateXML(txt)
{
    var res = false;
// code for IE
    if (window.ActiveXObject)
    {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async=false;
        xmlDoc.loadXML(txt);
        if(xmlDoc.parseError.errorCode == 0)
        {
            res = true;
        }
    }
// code for Mozilla, Firefox, Opera, etc.
    else if (document.implementation.createDocument)
    {
        try
        {
            var parser=new DOMParser();
            var xmlDoc=parser.parseFromString(txt,"application/xml");
        }
        catch(err)
        {
            console.log(err.message)
        }

        if (xmlDoc.getElementsByTagName("parsererror").length <= 0)
        {
            res = true;
        }
    }
    else
    {
        toastr.info('Your browser cannot handle XML validation');
    }
    return res;
}
