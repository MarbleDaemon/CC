Function point_in_rect(x#,y#,rx#,ry#,ra#,rb#)
	If x>=rx
	If x<=ra
	If y>=ry
	If y<=rb
		Return True
	End If
	End If
	End If
	End If
End Function

Function point_in_aabb(x#,y#,ab:aabb)
	If x>=ab.x And x<=ab.a
	If y>=ab.y And y<=ab.b
		Return True
	End If
	End If
End Function

Function rectsoverlap:Int(x0:Float,y0:Float,w0:Float,h0:Float,x2:Float,y2:Float,w2:Float,h2:Float)
	If x0>(x2+w2)Or(x0+w0)<x2 Then Return False
	If y0>(y2+h2)Or(y0+h0)<y2 Then Return False
	Return True
End Function

Function aabb_overlap_aabb(a:aabb,b:aabb,shift#=0)
	Return rectsoverlap(a.x,a.y,a.w,a.h,b.x,b.y,b.w,b.h)
End Function

Function distance#(x#,y#,a#,b#)
	Return ((x-a)*(x-a)+(y-b)*(y-b))^(.5)
	'Return Sqr((x-a)*(x-a)+(y-b)*(y-b))
End Function

Type line_to_box_intersection
	
	Global x#,y#
	
	Function test(last_x#, last_y#, dx#, dy#, bx1#, by1#, bx2#, by2#)
	
		If last_x < bx1 And dx >= bx1 		'does it cross left edge?
			y# = last_y + (dy - last_y) * (bx1-last_x)/(dx-last_x)
			If y>=by1 And y<=by2			'is intersection point on left edge?
				x# = bx1
				Return 2
			EndIf
		ElseIf last_x > bx2 And dx <= bx2	'does it cross right edge?
			y# = last_y + (dy - last_y) * (bx2 - last_x)/(dx - last_x)
			If y>=by1 And y<=by2			'is intersection point on right edge?
				x# = bx2
				Return 2
			EndIf
		EndIf
		
		If last_y < by1 And dy >= by1 		'does it cross top edge?
			x# = last_x + (dx - last_x) * (by1 - last_y)/(dy - last_y)
			If x>=bx1 And x<=bx2			'is intersection point on top edge?
				y# = by1
				Return 1
			EndIf
		ElseIf last_y > by2 And dy <= by2	'does it cross bottom edge?
			x# = last_x + (dx - last_x) * (by2 - last_y)/(dy - last_y)
			If x>=bx1 And x<=bx2			'is intersection point on bottom edge?
				y# = by2
				Return 1
			EndIf
		EndIf
		
		Return 0
		
	End Function
	
End Type
