package mn.nomin.demo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import mn.nomin.demo.core.BaseEntity;

@Table(name = "courses")
@Entity
public class Course extends BaseEntity {

    private String name, imgUrl;
    private Integer price, realPrice;
    private String userEmail;

    public Course() {

    }

    public Course(String name, String imgUrl, Integer price, Integer realPrice, String userEmail) {
        setName(name);
        setImgUrl(imgUrl);
        setPrice(price);
        setRealPrice(realPrice);
        setUserEmail(userEmail);
    }

    public String getUserEmail() {
        return this.userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getRealPrice() {
        return realPrice;
    }

    public void setRealPrice(Integer realPrice) {
        this.realPrice = realPrice;
    }
}
