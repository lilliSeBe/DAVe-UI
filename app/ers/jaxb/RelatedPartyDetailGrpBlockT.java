//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.4-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2014.12.02 at 05:29:10 PM CET 
//


package ers.jaxb;

import javax.xml.bind.annotation.*;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;


/**
 * <p>Java class for RelatedPartyDetailGrp_Block_t complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RelatedPartyDetailGrp_Block_t">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;group ref="{}RelatedPartyDetailGrpElements"/>
 *       &lt;/sequence>
 *       &lt;attGroup ref="{}RelatedPartyDetailGrpAttributes"/>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RelatedPartyDetailGrp_Block_t", propOrder = {
    "sub",
    "altPty",
    "rltnshp"
})
public class RelatedPartyDetailGrpBlockT {

    @XmlElement(name = "Sub")
    protected List<RelatedPartyDetailSubGrpBlockT> sub;
    @XmlElement(name = "AltPty")
    protected List<RelatedPartyDetailAltIDGrpBlockT> altPty;
    @XmlElement(name = "Rltnshp")
    protected List<PartyRelationshipGrpBlockT> rltnshp;
    @XmlAttribute(name = "ID")
    protected String id;
    @XmlAttribute(name = "Src")
    protected String src;
    @XmlAttribute(name = "R")
    protected BigInteger r;
    @XmlAttribute(name = "Qual")
    protected BigInteger qual;

    /**
     * Gets the value of the sub property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the sub property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSub().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RelatedPartyDetailSubGrpBlockT }
     * 
     * 
     */
    public List<RelatedPartyDetailSubGrpBlockT> getSub() {
        if (sub == null) {
            sub = new ArrayList<RelatedPartyDetailSubGrpBlockT>();
        }
        return this.sub;
    }

    /**
     * Gets the value of the altPty property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the altPty property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getAltPty().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link RelatedPartyDetailAltIDGrpBlockT }
     * 
     * 
     */
    public List<RelatedPartyDetailAltIDGrpBlockT> getAltPty() {
        if (altPty == null) {
            altPty = new ArrayList<RelatedPartyDetailAltIDGrpBlockT>();
        }
        return this.altPty;
    }

    /**
     * Gets the value of the rltnshp property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the rltnshp property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRltnshp().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link PartyRelationshipGrpBlockT }
     * 
     * 
     */
    public List<PartyRelationshipGrpBlockT> getRltnshp() {
        if (rltnshp == null) {
            rltnshp = new ArrayList<PartyRelationshipGrpBlockT>();
        }
        return this.rltnshp;
    }

    /**
     * Gets the value of the id property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getID() {
        return id;
    }

    /**
     * Sets the value of the id property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setID(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the src property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSrc() {
        return src;
    }

    /**
     * Sets the value of the src property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSrc(String value) {
        this.src = value;
    }

    /**
     * Gets the value of the r property.
     * 
     * @return
     *     possible object is
     *     {@link java.math.BigInteger }
     *
     */
    public BigInteger getR() {
        return r;
    }

    /**
     * Sets the value of the r property.
     *
     * @param value
     *     allowed object is
     *     {@link java.math.BigInteger }
     *
     */
    public void setR(BigInteger value) {
        this.r = value;
    }

    /**
     * Gets the value of the qual property.
     *
     * @return
     *     possible object is
     *     {@link java.math.BigInteger }
     *
     */
    public BigInteger getQual() {
        return qual;
    }

    /**
     * Sets the value of the qual property.
     *
     * @param value
     *     allowed object is
     *     {@link java.math.BigInteger }
     *     
     */
    public void setQual(BigInteger value) {
        this.qual = value;
    }

}
