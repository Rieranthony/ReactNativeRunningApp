import { StyleSheet } from "react-native";
import { normaliseFont } from "@src/utils";

export default StyleSheet.create({
  base: {
    fontStyle: 'normal'
  },
  bold: {
    fontWeight: '800'
  },
  button: {
    fontSize: normaliseFont(20),
    lineHeight: 23,
    fontWeight: '500',
    letterSpacing: 4
  },
  h1: {
    fontSize: normaliseFont(110),
    lineHeight: 129,
    fontWeight: 'normal',
    letterSpacing: -1.5
  },
  h3: {
    fontSize: normaliseFont(48),
    lineHeight: 56,
    fontWeight: 'normal',
  },
  h4: {
    fontSize: normaliseFont(24),
    lineHeight: 28,
    fontWeight: '500',
    letterSpacing: -0.5
  },
  h6: {
    fontSize: normaliseFont(16),
    lineHeight: 28,
    fontWeight: 'normal',
    letterSpacing: 0.44
  },
  giant: {
    fontSize: normaliseFont(200),
    lineHeight: 234,
    fontWeight: 'bold',
    letterSpacing: -1.5
  },
})